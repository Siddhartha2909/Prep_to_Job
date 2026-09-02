import React from 'react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Input, { Field } from '../components/Input'
import Button from '../components/Button'
import { mockUser } from '../data/mockData'

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your account details." />
      <Card className="max-w-lg">
        <div className="flex flex-col gap-4">
          <Field label="Full Name" htmlFor="settingsName">
            <Input id="settingsName" defaultValue={mockUser.name} />
          </Field>
          <Field label="Email" htmlFor="settingsEmail">
            <Input id="settingsEmail" type="email" defaultValue={mockUser.email} />
          </Field>
          <div>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
