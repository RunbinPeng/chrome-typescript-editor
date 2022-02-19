import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $message: {
      error: any;
      success: any;
      warning: any;
    }
  }

}