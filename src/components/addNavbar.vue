<template>
<div class="nav-bar">
    <div class="title">Polling-System</div>
    <div class="home" v-if="user">
        <router-link to="/home" class="routerCss">
        login as {{user.firstName}}
        </router-link>
        <button class="logOutbtn" @click="logout"> Logout</button>
    </div>

    <div class="n-login" v-else>
        <router-link to="/signup">Signup</router-link>|
        <router-link to="/login">Login</router-link>
    </div>
</div>
</template>

<script>
import {
    fetchApi
} from '../composable/loginApi'
export default {

    name: "nav-bar",
    setup() {
        return {
            ...fetchApi(),
        };
    }
};
</script>

<style scoped>
.nav-bar {
    background-color: grey;
    max-width: 100%;
    height: 115px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.3);
}

.title {
    font-size: 28px;
    color: white;
    padding-top: 40px;
    font-weight: bold;
    letter-spacing: 1px;
    ;
}

.home {

    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;
    margin-right: 60px;
    margin-bottom: 20px;
    padding-bottom: 10px;
}

.home a {
    margin-right: 30px;
}

.routerCss {
    background-color: #49c1a2;
    width: 10%;
    padding: 7px;
    font-size: 17px;
    letter-spacing: 1px;
    border-radius: 8px;
    color: black;
    text-decoration: none;
    
}

.home i {
    color: black;
    font-size: 16px;
    margin-left: 10px;

}

.logOutbtn {
    color: white;
    background-color: blue;
    border: none;
    width: 7%;
    padding: 7px;
    font-size: 17px;
    border-radius: 10px;
    cursor: pointer
}

.n-login {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;
    margin-right: 17px;
    margin-top:15px;
    letter-spacing: 2px;
    padding-bottom: 10px;
    font-size: 20px;

}

.n-login a {
    color: white;
    text-decoration: none;

}
 
.router-link-exact-active {
border-bottom: 2px solid white;
}
</style>
