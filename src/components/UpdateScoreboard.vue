<script setup>
    import {ref, onMounted} from 'vue';

    let socket = null;
    const score = ref(0);
    const team = ref(1);

    const updateScoreboard = () => {
        const data = {
            team: parseInt(team.value, 10),
            score: score.value,
        };

        if (socket.readyState === WebSocket.OPEN){
            socket.send(JSON.stringify(data));
            console.log(data);

            //send data to API via https://dev5-lab4.onrender.com/api/v1/score/1 for team 1 with PUT request
            try{
                fetch('https://dev5-lab4.onrender.com/api/v1/score/' + data.team, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({score: data.score}),
                })
                }catch(error){
                    console.log(error);
                };

        }else{
            console.log("socket not ready");
        }        
        
    };

    onMounted(() => {
        socket = new WebSocket('wss://labo6-back-arne.onrender.com/primus');

    });
</script>

<template>
    <div>
        <h1>Update Score</h1>
        <form @submit.prevent="updateScoreboard">
            <label for="team">Team</label>
            <select id="team" v-model="team">
                <option value="1">Gambit</option>
                <option value="2">Östersnud</option>
                <option value="3">Bambino</option>
            </select>
            <label for="score">Score</label>
            <input type="number" id="score" v-model="score" />
            <button type="submit">Update Score</button>
        </form>
    </div>
    <div>
        <router-link to="/live"><button>go to live</button></router-link>
    </div>

</template>

<style scoped>

</style>