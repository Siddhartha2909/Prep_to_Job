// resumeService — talks to /api/resume/* once the backend exists.

import { mockResume, mockMatch } from '../data/mockData'

function delay(value, ms = 900) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/**
 * Future: POST /api/resume/upload (multipart/form-data)
 * For now, accepts a browser File object and returns mock metadata.
 */
export function uploadResume(file) {
  // TODO: replace with:
  // const formData = new FormData()
  // formData.append('resume', file)
  // fetch('/api/resume/upload', { method: 'POST', body: formData })
  return delay({
    ...mockResume,
    fileName: file?.name ?? mockResume.fileName,
    fileSize: file ? `${Math.max(1, Math.round(file.size / 1024))} KB` : mockResume.fileSize,
    analysisStatus: 'uploaded',
  })
}

/**
 * Future: GET /api/resume
 */
export function getResume() {
  // TODO: replace with fetch('/api/resume')
  return delay(mockResume, 300)
}

/**
 * Future: POST /api/match/analyze
 * body: { resumeId, jobId }
 */
export function getMatchResult({ resumeId, jobId } = {}) {
  // TODO: replace with fetch('/api/match/analyze', { method: 'POST', body: JSON.stringify({ resumeId, jobId }) })
  return delay({ ...mockMatch, resumeId: resumeId ?? mockMatch.resumeId, jobId: jobId ?? mockMatch.jobId }, 1200)
}
