<template>
  <div class="helper">
    <span class="left">{{unfinishedTodosLength}} items left</span>
    <span class="tabs">
      <span
        v-for="tabName in tabArr"
        :key="tabName"
        :class="[tabName, currentTab === tabName ? 'activated' : '']"
        @click="toggleCurrentTab(tabName)">
        {{tabName}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear completed</span>
  </div>
</template>

<script>
export default {
  props: {
    currentTab: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      tabArr:   ['all', 'active', 'completed']
    }
  },
  computed: {
    unfinishedTodosLength () {
      // var count = 0
      // this.todos.forEach(element => element.completed ? 0 : count++)
      // return count
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    },
    toggleCurrentTab (tabName) {
      this.$emit('toggleTab', tabName)
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper{
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing: antialiased
}
.left, .clear, .tabs{
  padding 0 10px
  box-sizing border-box
}
.left, .clear{
  width 150px
}
.left{
  text-align left
}
.clear{
  text-align right
  cursor pointer
}
.tabs{
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.activated{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
    }
  }
}
</style>

