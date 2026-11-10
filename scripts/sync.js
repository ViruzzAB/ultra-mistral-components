const fs = require('fs');

async function getAccessToken(clientId, clientSecret, refreshToken) {
    const res = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        })
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Erreur jeton Strava: ${JSON.stringify(data)}`);
    }
    return data.access_token;
}

async function fetchAthleteData(token, runnerName) {
    const res = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=30', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const activities = await res.json();
    
    if (!Array.isArray(activities)) {
        console.warn(`Aucune activité reçue pour ${runnerName}:`, activities);
        return { runs: [], totalKm: 0, totalDplus: 0 };
    }

    const runs = activities.filter(a => a.type === 'Run' || a.sport_type === 'TrailRun' || a.sport_type === 'Run');
    let totalDist = 0;
    let totalElev = 0;

    const formattedRuns = runs.slice(0, 6).map(r => {
        totalDist += (r.distance || 0);
        totalElev += (r.total_elevation_gain || 0);
        
        const distKm = (r.distance || 0) / 1000;
        let paceStr = "--";
        if (distKm > 0 && r.moving_time) {
            const paceSec = r.moving_time / distKm;
            const pMin = Math.floor(paceSec / 60);
            const pSec = String(Math.round(paceSec % 60)).padStart(2, '0');
            paceStr = `${pMin}:${pSec} /km`;
        }

        return {
            title: r.name || 'Sortie Strava',
            runner: runnerName,
            distance: distKm.toFixed(1).replace('.', ',') + ' km',
            dplus: Math.round(r.total_elevation_gain || 0) + ' m',
            pace: paceStr,
            hr: r.average_heartrate ? Math.round(r.average_heartrate) + ' bpm' : 'Strava Sync',
            date: new Date(r.start_date).toLocaleDateString('fr-FR'),
            url: `https://www.strava.com/activities/${r.id}`
        };
    });

    return {
        runs: formattedRuns,
        totalKm: Math.round(totalDist / 1000),
        totalDplus: Math.round(totalElev)
    };
}

async function main() {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const tokenG = process.env.STRAVA_REFRESH_TOKEN_GRAGAMS;
    const tokenA = process.env.STRAVA_REFRESH_TOKEN_ALEX;

    let gragamsData = { runs: [], totalKm: 0, totalDplus: 0 };
    let alexData = { runs: [], totalKm: 0, totalDplus: 0 };

    if (tokenG && tokenG.trim().length > 5) {
        try {
            console.log("Synchronisation de GRAGAMs...");
            const accessG = await getAccessToken(clientId, clientSecret, tokenG);
            gragamsData = await fetchAthleteData(accessG, "GRAGAMs (#01)");
        } catch (e) {
            console.error("Erreur pour GRAGAMs:", e.message);
        }
    }

    if (tokenA && tokenA.trim().length > 5) {
        try {
            console.log("Synchronisation d'ALEX...");
            const accessA = await getAccessToken(clientId, clientSecret, tokenA);
            alexData = await fetchAthleteData(accessA, "ALEX (#02)");
        } catch (e) {
            console.error("Erreur pour ALEX:", e.message);
        }
    }

    const payload = {
        updatedAt: new Date().toISOString(),
        gragams: gragamsData,
        alex: alexData,
        recentRuns: [...alexData.runs, ...gragamsData.runs].sort((a, b) => new Date(b.date) - new Date(a.date))
    };

    fs.writeFileSync('data.json', JSON.stringify(payload, null, 2));
    console.log("Fichier data.json généré avec succès !");
}

main().catch(err => {
    console.error("Échec global:", err);
    process.exit(1);
});
