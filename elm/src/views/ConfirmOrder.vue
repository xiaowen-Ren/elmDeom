<template>
    <div class="confirmOrder">
        <header>
            <i class="el-icon-arrow-left" @click="backRoute"></i>
            <span>确认订单</span>
            <router-link to="/msite" class="el-icon-s-custom"></router-link>
        </header>
        <div class="main">
            <div class="address">
                <i class="el-icon-location-outline"></i>
                <div>
                    <div>
                        <span>姓名</span>
                        <span>先生</span>
                        <span>电话</span>
                    </div>
                    <div>
                        <span>无</span>
                        <span>详细地址</span>
                    </div>
                </div>
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="times">
                <h4>送达时间</h4>
                <div>
                    <p>尽快送达 | 预计 16:02</p>
                    <p>蜂鸟专送</p>
                </div>
            </div>
            <div class="pay">
                <p>支付方式<span>在线支付<i class="el-icon-arrow-right"></i></span></p>
                <p>红包<span>暂时只在饿了么APP中支持</span></p>
            </div>
            <div class="store">
                <div>
                    <img src="">
                    <span></span>
                </div>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>
            <div class="remarks">
                <div>
                    <span>订单备注</span>
                    <i class="el-icon-arrow-right"></i>
                    <span>备注信息</span>
                </div>
                <div>
                    <span>发票抬头</span>
                    <i class="el-icon-arrow-right"></i>
                    <span>不需要发票</span>
                </div>
            </div>
        </div>
        <footer>
            <p>待支付 ￥400</p>
            <p>确认下单</p>
        </footer>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    export default {
        name: "ConfirmOrder",
        methods:{
            ...mapMutations(["backRoute"])
        }
    }
</script>

<style scoped>
    .main{
        margin-top: 2rem;
    }
    .address{
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=) 0 100% repeat-x;
    }
    .address{
        overflow: hidden;
        background-color: white;
        padding: 1rem .5rem;
    }
    .address>div{
        float: left;
    }
    .address>i{
        line-height: 2rem;
    }
    .address>i:nth-child(1){
        color: #5bc0de;
        float: left;
        margin-right: .5rem;
    }
    .address>i:nth-child(3){
        float: right;
    }
    .address>div>div:nth-child(1)>span:nth-child(1){
        font-size: .9rem;
    }
    .address>div>div:nth-child(1)>span:nth-child(2){
        font-size: .75rem;
        margin: 0 .3rem;
    }
    .address>div>div:nth-child(1)>span:nth-child(3){
        font-size: .75rem;
    }
    .address>div>div:nth-child(2)>span:nth-child(1){
        font-size: .6rem;
        margin-right: .35rem;
        padding: 0 .23rem;
        background-color: #ff5722;
        border-radius: .15rem;
        color: white;
    }
    .address>div>div:nth-child(2)>span:nth-child(2){
        font-size: .6rem;
        color: #777777;
    }
    .times{
        height: 4.5rem;
        background-color: white;
        margin-top: .5rem;
        padding: 0 .8rem;
    }
    .times>h4{
        font-size: .95rem;
        float: left;
        line-height: 4.5rem;
        font-weight: 800;
    }
    .times>div{
        float: right;
        margin-top: 1rem;
    }
    .times>div>p:nth-child(1){
        font-size: .8rem;
        color: #3190E8;
    }
    .times>div>p:nth-child(2){
        font-size: .6rem;
        background-color: #3190e8;
        color: white;
        float: right;
        padding: .2rem;
        margin-top: .55rem;
        border-radius: .2rem;
    }
    .pay{
        height: 4.8rem;
        background-color: white;
        margin-top: .5rem;
        padding: 0 .6rem;
    }
    .pay>p{
        height: 2.4rem;
        line-height: 2.4rem;
        color: #666666;
        font-size: .8rem;
    }
    .pay>p:nth-child(1){
        border-bottom: .05rem solid #f5f5f5;
    }
    .pay>p>span{
        float: right;
        font-size: .7rem;
    }
    .pay>p>span>i{
        padding-right: .1rem;
    }
    .remarks{
        height: 4.8rem;
        background-color: white;
        padding: 0 .7rem;
    }
    .remarks>div{
        height: 2.4rem;
        line-height: 2.4rem;
    }
    .remarks>div:nth-child(1){
        border-bottom: .05rem solid #f5f5f5;
    }
    .remarks>div>span:nth-child(1){
        font-size: .8rem;
        color: #666666;
    }
    .remarks>div>span:nth-child(3){
        font-size: .7rem;
        float: right;
        color: #aaaaaa;
        display: inline-block;
        max-width: 11.7rem;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .remarks>div>i{
        float: right;
        line-height: 2.4rem;
    }






    header{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        text-align: center;
        background-color: blue;
        color: #ffffff;
        position: fixed;
        top: 0;
        z-index: 3;
        overflow: hidden;
    }
    header>i:nth-child(1){
        float: left;
        margin-top: .5rem;
    }
    header>a{
        float: right;
        margin: .5rem .5rem 0 0;
        color: white;
    }
    header>span{
        display: inline-block;
        width: 10rem;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
    footer{
        height: 2.5rem;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    footer>p{
        float: left;
    }
    footer>p:nth-child(1){
        height: 2.5rem;
        background-color: #333333;
        width: 70%;
        line-height: 2.5rem;
        color: white;
        padding-left: .6rem;
        font-size: .9rem;
        box-sizing: border-box;
    }
    footer>p:nth-child(2){
        background-color: #56d176;
        height: 2.5rem;
        width: 30%;
        line-height: 2.5rem;
        text-align: center;
        color: white;
        font-size: .8rem;
    }
</style>