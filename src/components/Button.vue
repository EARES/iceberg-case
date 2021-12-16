<template>
  <button :class="classname" :id="btnid">
    {{ textbutton }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    classname: {
      type: String,
      required: true,
    },
    btnid: {
      type: String,
      required: true,
    },
    textbutton: {
      type: String,
      required: true,
    },
  },
};
</script>