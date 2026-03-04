import { ref } from 'vue'

const detectionResult = ref(null)

export const useDetectionResult = () => {
  const setResult = (data) => {
    detectionResult.value = data
  }

  const clearResult = () => {
    detectionResult.value = null
  }

  return {
    detectionResult,
    setResult,
    clearResult
  }
}
