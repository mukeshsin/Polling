<template>
<div class="nav-bar">
    <div class="title">Polling-System</div>
    <div class="home" v-if="user">
        <router-link to="/home" class="routerCss">
            <i class="fa fa-home" aria-hidden="true"></i>user logged in {{user.firstName}}
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
        const user = JSON.parse(localStorage.getItem('user'))
        const {
            logout
        } = fetchApi();
        return {
            user,
            logout

        }
    }
};
</script>

<style scoped>
.nav-bar {
    background-color: grey;
    max-width: 100%;
    height: 100%;
    margin-bottom: 20px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.3);
}

.title {
    font-size: 25px;
    color: white;
    padding-top: 15px;
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
    width: 15%;
    padding: 10px;
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
    padding: 10px;
    font-size: 17px;
    border-radius: 10px;
    cursor: pointer
}

.n-login {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;
    margin-right: 40px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    padding-bottom: 10px;

}

.n-login a {
    color: white;
    text-decoration: none;

}
</style>
