<template>
<div class="toastWrap">
    <div class="toastContent">
        <slot name="content"></slot>
    </div>

</div>
</template>

<script>
import {
    fetchApi
} from "../composable/loginApi.js";
export default {
    name: "successToast",
    setup() {
        return {
            ...fetchApi()
        };
    },
};
</script>
