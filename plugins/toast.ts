import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineNuxtPlugin((nuxtApp) => {
  const notify = (type: 'success' | 'error' | 'info' | 'warn', message: string) => {
    useToast().open({
      message: message,
      type: type,
      duration: type === 'error' ? 0 : 3000,
      position: 'bottom-left',
      dismissible: true,
    })
  }


  return {
    provide: {
      notify,
    }
  }
})