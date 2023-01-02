<template>
  <a-upload
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    @change="handleChange"
    @beforeUpload="beforeUpload"
    :action="uploadFileUrl"
  >
    <a-spin :spinning="uploadLoading">
      <img v-if="fileUrl" :src="fileUrl" style="height: 200px;" />
      <div v-else class="ant-upload-text">Upload</div>
    </a-spin>
  </a-upload>
</template>
    
  <script lang="ts">
import { message } from "ant-design-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ImageType",
  props: {
    uploadFileUrl: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    }
  },
  emits: ['update:fileUrl'],
  setup(props, { emit }) {
    const uploadLoading = ref(false)

    function handleChange(info: any) {
      const { response, status } = info.file
      if (status === 'done' && response && response.code === 0) {
        message.success('上传成功')
        const resultUrl = response.result.pic_url
        setTimeout(() => {
          uploadLoading.value = false
          emit('update:fileUrl', resultUrl)
        }, 500);
      }
    }

    function beforeUpload() {
      uploadLoading.value = true
      return false;
    }

    return {
      uploadLoading,
      beforeUpload,
      handleChange
    };
  },
});
</script>
  <style lang="scss" scoped>
</style>
    