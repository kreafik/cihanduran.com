// Geçici: Task 3'te yönlendirme ve başlıklarla değiştirilecek.
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
