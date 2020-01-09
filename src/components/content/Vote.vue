<template>
    <Row class="vote">
        <Row class="up"><Icon type="md-arrow-round-up" /></Row>
        <Row class="up-number">{{voteNumber}}</Row>
        <Row class="down"><Icon type="md-arrow-round-down" /></Row>
    </Row>
</template>

<script>
    export default {
        name: "Vote",
        props: {
            voteNumber: {
                default: 0
            }
        }
    }
</script>

<style lang="less" scoped>
    .vote {
        width: 50px;
        text-align: center;
        .up, .down {
            cursor: pointer;
        }
    }
</style>
