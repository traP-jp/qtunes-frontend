<temlate>
<el-card class="box-card">
</el-card>
</temlate>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserElement',
  props: {
    gakunen: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>
