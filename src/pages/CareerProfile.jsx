import React, { useEffect, useState } from 'react'
import { Plus, Trash2, X, GraduationCap, Sparkles, Briefcase, Award, Target } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Input, { Field, Textarea } from '../components/Input'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { LoadingState } from '../components/LoadingState'
import { getProfile, saveProfile } from '../services/profileService'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

const SECTION_ICONS = { education: GraduationCap, projects: Sparkles, experience: Briefcase, certifications: Award }

function ListSection({ title, icon: Icon, items, onAdd, onRemove, renderItem, addLabel }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-forest-50 p-1.5 text-forest-600">
            <Icon size={16} />
          </div>
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
        </div>
        <Button variant="ghost" size="sm" icon={Plus} onClick={onAdd}>
          {addLabel}
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {items.length === 0 && <p className="text-sm text-ink-faint">Nothing added yet.</p>}
        {items.map((item, idx) => (
          <div key={item.id} className="relative rounded-xl border border-line-soft p-4">
            <button
              onClick={() => onRemove(item.id)}
              aria-label="Remove entry"
              className="absolute right-3 top-3 rounded-full p-1 text-ink-faint hover:bg-paper-soft hover:text-brick-500"
            >
              <Trash2 size={14} />
            </button>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function CareerProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState(null)
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data)
      setLoading(false)
    })
  }, [])

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }))
    setSaved(false)
  }

  function updateListItem(field, id, key, value) {
    setProfile((p) => ({
      ...p,
      [field]: p[field].map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }))
    setSaved(false)
  }

  function addListItem(field, template) {
    setProfile((p) => ({ ...p, [field]: [...p[field], { id: uid(), ...template }] }))
  }

  function removeListItem(field, id) {
    setProfile((p) => ({ ...p, [field]: p[field].filter((item) => item.id !== id) }))
  }

  function addSkill() {
    const value = skillInput.trim()
    if (!value || profile.skills.includes(value)) return
    update('skills', [...profile.skills, value])
    setSkillInput('')
  }

  function removeSkill(skill) {
    update(
      'skills',
      profile.skills.filter((s) => s !== skill)
    )
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      // Structured to later PUT /api/profile
      await saveProfile(profile)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !profile) return <LoadingState message="Loading your profile…" />

  return (
    <div>
      <PageHeader
        title="Career Profile"
        description="This information powers your resume match and skill gap results."
      />

      <form className="flex flex-col gap-6" onSubmit={handleSave}>
        {/* Personal information */}
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-ink">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" htmlFor="fullName" required>
              <Input id="fullName" value={profile.fullName} onChange={(e) => update('fullName', e.target.value)} />
            </Field>
            <Field label="Email" htmlFor="profileEmail" required>
              <Input id="profileEmail" type="email" value={profile.email} onChange={(e) => update('email', e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* Education */}
        <ListSection
          title="Education"
          icon={SECTION_ICONS.education}
          items={profile.education}
          addLabel="Add education"
          onAdd={() => addListItem('education', { degree: '', institution: '', graduationYear: '' })}
          onRemove={(id) => removeListItem('education', id)}
          renderItem={(item) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field label="Degree" htmlFor={`degree-${item.id}`}>
                <Input
                  id={`degree-${item.id}`}
                  placeholder="B.Tech, Computer Science"
                  value={item.degree}
                  onChange={(e) => updateListItem('education', item.id, 'degree', e.target.value)}
                />
              </Field>
              <Field label="College / University" htmlFor={`inst-${item.id}`}>
                <Input
                  id={`inst-${item.id}`}
                  value={item.institution}
                  onChange={(e) => updateListItem('education', item.id, 'institution', e.target.value)}
                />
              </Field>
              <Field label="Graduation Year" htmlFor={`year-${item.id}`}>
                <Input
                  id={`year-${item.id}`}
                  value={item.graduationYear}
                  onChange={(e) => updateListItem('education', item.id, 'graduationYear', e.target.value)}
                />
              </Field>
            </div>
          )}
        />

        {/* Skills */}
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-ink">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} tone="forest" className="pr-1.5">
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                  className="ml-1 rounded-full p-0.5 hover:bg-forest-100"
                >
                  <X size={11} />
                </button>
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="e.g. Python"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSkill()
                }
              }}
              aria-label="Add a skill"
            />
            <Button type="button" variant="secondary" icon={Plus} onClick={addSkill}>
              Add
            </Button>
          </div>
        </Card>

        {/* Projects */}
        <ListSection
          title="Projects"
          icon={SECTION_ICONS.projects}
          items={profile.projects}
          addLabel="Add project"
          onAdd={() => addListItem('projects', { name: '', description: '', technologies: '' })}
          onRemove={(id) => removeListItem('projects', id)}
          renderItem={(item) => (
            <div className="flex flex-col gap-3">
              <Field label="Project Name" htmlFor={`pname-${item.id}`}>
                <Input
                  id={`pname-${item.id}`}
                  value={item.name}
                  onChange={(e) => updateListItem('projects', item.id, 'name', e.target.value)}
                />
              </Field>
              <Field label="Description" htmlFor={`pdesc-${item.id}`}>
                <Textarea
                  id={`pdesc-${item.id}`}
                  rows={2}
                  value={item.description}
                  onChange={(e) => updateListItem('projects', item.id, 'description', e.target.value)}
                />
              </Field>
              <Field label="Technologies Used" htmlFor={`ptech-${item.id}`}>
                <Input
                  id={`ptech-${item.id}`}
                  placeholder="React, Node.js, MongoDB"
                  value={item.technologies}
                  onChange={(e) => updateListItem('projects', item.id, 'technologies', e.target.value)}
                />
              </Field>
            </div>
          )}
        />

        {/* Certifications */}
        <ListSection
          title="Certifications"
          icon={SECTION_ICONS.certifications}
          items={profile.certifications}
          addLabel="Add certification"
          onAdd={() => addListItem('certifications', { name: '', organization: '', year: '' })}
          onRemove={(id) => removeListItem('certifications', id)}
          renderItem={(item) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field label="Certification Name" htmlFor={`cname-${item.id}`}>
                <Input
                  id={`cname-${item.id}`}
                  value={item.name}
                  onChange={(e) => updateListItem('certifications', item.id, 'name', e.target.value)}
                />
              </Field>
              <Field label="Issuing Organization" htmlFor={`corg-${item.id}`}>
                <Input
                  id={`corg-${item.id}`}
                  value={item.organization}
                  onChange={(e) => updateListItem('certifications', item.id, 'organization', e.target.value)}
                />
              </Field>
              <Field label="Year" htmlFor={`cyear-${item.id}`}>
                <Input
                  id={`cyear-${item.id}`}
                  value={item.year}
                  onChange={(e) => updateListItem('certifications', item.id, 'year', e.target.value)}
                />
              </Field>
            </div>
          )}
        />

        {/* Experience */}
        <ListSection
          title="Experience"
          icon={SECTION_ICONS.experience}
          items={profile.experience}
          addLabel="Add experience"
          onAdd={() => addListItem('experience', { title: '', organization: '', duration: '', description: '' })}
          onRemove={(id) => removeListItem('experience', id)}
          renderItem={(item) => (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Field label="Job / Internship Title" htmlFor={`etitle-${item.id}`}>
                  <Input
                    id={`etitle-${item.id}`}
                    value={item.title}
                    onChange={(e) => updateListItem('experience', item.id, 'title', e.target.value)}
                  />
                </Field>
                <Field label="Organization" htmlFor={`eorg-${item.id}`}>
                  <Input
                    id={`eorg-${item.id}`}
                    value={item.organization}
                    onChange={(e) => updateListItem('experience', item.id, 'organization', e.target.value)}
                  />
                </Field>
                <Field label="Duration" htmlFor={`edur-${item.id}`}>
                  <Input
                    id={`edur-${item.id}`}
                    placeholder="May 2025 – Jul 2025"
                    value={item.duration}
                    onChange={(e) => updateListItem('experience', item.id, 'duration', e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Description" htmlFor={`edesc-${item.id}`}>
                <Textarea
                  id={`edesc-${item.id}`}
                  rows={2}
                  value={item.description}
                  onChange={(e) => updateListItem('experience', item.id, 'description', e.target.value)}
                />
              </Field>
            </div>
          )}
        />

        {/* Career goal */}
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-forest-50 p-1.5 text-forest-600">
              <Target size={16} />
            </div>
            <h3 className="text-sm font-semibold text-ink">Career Goal</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Target Role" htmlFor="targetRole">
              <Input id="targetRole" value={profile.targetRole} onChange={(e) => update('targetRole', e.target.value)} />
            </Field>
            <Field label="Target Company" htmlFor="targetCompany">
              <Input id="targetCompany" value={profile.targetCompany} onChange={(e) => update('targetCompany', e.target.value)} />
            </Field>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg" loading={saving}>
            Save Profile
          </Button>
          {saved && <span className="text-sm text-forest-600">Profile saved.</span>}
        </div>
      </form>
    </div>
  )
}
