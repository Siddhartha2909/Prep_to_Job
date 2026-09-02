import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import FileUpload from '../components/FileUpload'
import Button from '../components/Button'
import { uploadResume } from '../services/resumeService'

export default function ResumeUpload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle | uploading | uploaded | analyzing | analyzed
  const [error, setError] = useState('')

  async function handleSelect(rawFile) {
    const isValidType = /\.(pdf|docx)$/i.test(rawFile.name)
    if (!isValidType) {
      setError('Please upload a PDF or DOCX file.')
      return
    }
    setError('')
    setStatus('uploading')
    const result = await uploadResume(rawFile)
    setFile({ name: result.fileName, size: result.fileSize })
    setStatus('uploaded')
  }

  function handleRemove() {
    setFile(null)
    setStatus('idle')
    setError('')
  }

  async function handleAnalyze() {
    setStatus('analyzing')
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setStatus('analyzed')
    navigate('/job-description')
  }

  return (
    <div>
      <PageHeader
        title="Analyze Your Resume"
        description="Upload your resume so PrepToJob can evaluate it against your target job."
      />

      <Card className="max-w-2xl">
        <FileUpload file={file} status={status} onSelect={handleSelect} onRemove={handleRemove} />

        {error && <p className="mt-3 text-sm text-brick-500">{error}</p>}

        {status === 'uploading' && <p className="mt-3 text-sm text-ink-muted">Uploading resume…</p>}
        {status === 'analyzing' && <p className="mt-3 text-sm text-ink-muted">Analyzing your resume…</p>}
        {status === 'uploaded' && <p className="mt-3 text-sm text-forest-600">Resume uploaded successfully.</p>}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={!file || status === 'uploading'}
            loading={status === 'analyzing'}
          >
            Analyze Resume
          </Button>
        </div>
      </Card>
    </div>
  )
}
