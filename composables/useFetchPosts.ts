import { ref } from "vue";
import axios from "axios";
import { notifyShow } from "~/utils/showNotification";

interface Post {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export function useInfinitePosts() {
  const posts = ref<Post[]>([]);
  const page = ref(1);
  const isLoading = ref(false);
  const hasMore = ref(true);

  const nuxtApp = useNuxtApp();
  const translate = nuxtApp.vueApp.config.globalProperties.$t;

  const loadMore = async () => {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;

    try {
      const res = await axios.get(
        `http://13.60.56.112/api/posts?page=${page.value}`
      );

      const fetchedPosts = res.data?.data || [];

      if (fetchedPosts.length === 0) {
        hasMore.value = false;
      } else {
        posts.value.push(...fetchedPosts);
        page.value += 1;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      notifyShow(translate("FailedFetchPost"), "error");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    posts,
    isLoading,
    hasMore,
    loadMore,
  };
}
