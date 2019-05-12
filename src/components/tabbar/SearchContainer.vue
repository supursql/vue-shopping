<template>
  <div>
    <div class="search">
      <div class="search-inner">
        <img src="../../images/search.svg" alt="">
        <input type="text" placeholder="搜索" class="search-input">
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, .1);
  display: flex;
  justify-content: center;
  align-items: center;

  .search-inner {
    width: 98%;
    height: 70%;
    background-color: white;
    border-radius: 15px;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 25px;
      height: 25px;
    }

    .search-input {
      width: 85%;
      height: 80%;
      margin-top: 4%;
      border: none;
    }
  }

}
</style>
