<template>
  <div>
    <div class="title-content">
      <i class="el-icon-refresh-right title-icon" />
      Random
    </div>
    <el-card class="random-container" @click="playRandom">
      <BigIconButton
        icon="el-icon-video-play"
        class="random-content"
        size="48px"
      />
    </el-card>
  </div>
  <div v-if="favorites !== null && favorites.length > 0" class="list-container">
    <div class="title-content">
      <router-link :to="{ name: 'favorite' }" class="no-decoration">
        <i class="el-icon-star-on title-icon" />
        Favorites
      </router-link>
    </div>
    <div class="fav-all-container">
      <el-card v-for="audio in favorites" :key="audio.id" class="fav-container">
        <el-image
          :src="`https://q.trap.jp/api/1.0/public/icon/${audio.composer_name}`"
          class="fav-image"
          @click="playAudio(audio.id)"
        />
        <div class="sound-title">
          {{ audio.title }}
        </div>
        <router-link :to="`/users/${audio.composer_name}`">
          <div class="sound-composer">
            {{ audio.composer_name }}
          </div>
        </router-link>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { ModelFile } from '../../lib/apis/generated'
import { useStore } from '../../main'
import { api } from '../../utils/api'
import BigIconButton from '/@/components/BigIconButton.vue'

export default defineComponent({
  name: 'Top',
  components: {
    BigIconButton,
  },
  setup() {
    const store = useStore()
    const favorites: Ref<ModelFile[] | null> = ref(null)
    const fetchFavorites = async () => {
      try {
        const { data } = await api.getMeFavorite()
        favorites.value = data
      } catch (err) {
        console.error(err)
      }
    }
    fetchFavorites()
    const playRandom = async () => {
      const { data } = await api.getFileRandom()
      store.dispatch('chgAudio', {
        id: data.id,
        title: data.title,
        composer: data.composer_name,
        isFav: data.is_favorite_by_me,
      })
    }
    const playAudio = async (id: string) => {
      const { data } = await api.getFile(id)
      store.dispatch('chgAudio', {
        id: data.id,
        title: data.title,
        composer: data.composer_name,
        isFav: data.is_favorite_by_me,
      })
    }
    return {
      playRandom,
      playAudio,
      favorites,
    }
  },
})
</script>

<style lang="scss" scoped>
.random-container {
  height: 200px;
  min-height: 200px;
  width: min(100%, 480px);
  min-width: min(100%, 480px);
  position: relative;
  box-sizing: border-box;
  .random-content {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    height: 48px;
    width: 48px;
  }
}
.title-content {
  margin-bottom: 18px;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  .no-decoration {
    text-decoration: none;
    color: inherit;
  }
  .title-icon {
    font-size: 18px;
    margin-right: 8px;
  }
}
.list-container {
  margin-top: 24px;
}
.fav-all-container {
  display: flex;
  overflow: hidden;
  .fav-container {
    width: 160px;
    height: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 16px;
    .fav-image:hover {
      opacity: 0.8;
      transition: 0.3s;
    }
    & a {
      text-decoration-line: none;
    }
  }
  .sound-title,
  .sound-composer {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sound-title {
    font-size: 16px;
    line-height: 20px;
    margin-top: 8px;
  }
  .sound-composer {
    font-size: 12px;
    line-height: 16px;
    color: #909399;
    text-decoration-line: none;
  }
}
</style>
