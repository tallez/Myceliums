import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

import Image from "next/image"

export enum FormFieldType {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  Select = "select",
  Radio = "radio",
  Checkbox = "checkbox",
  Textarea = "textarea",
  File = "file",
  Date = "date",
  Autocomplete = "autocomplete",
  Phone = "phone",
}

export interface FormField {
  name: string
  label: string
  type: FormFieldType
  required: boolean
  options?: string[]
  table?: string
}

const exampleFields = [
  { name: "name", label: "Name", type: FormFieldType.Text, required: true },
  { name: "email", label: "Email", type: FormFieldType.Email, required: true },
  {
    name: "password",
    label: "Password",
    type: FormFieldType.Password,
    required: true,
  },
]

export default function Form({
  title,
  fields = exampleFields,
  //storagePosition = "images/products",
  endpoint = "/api/formtest",
  method = "POST",
}: {
  title: String
  fields?: FormField[]
  //storagePosition?: String
  endpoint?: string
  method?: String
  successMessage?: String
}) {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const commonFields = [
    FormFieldType.Text,
    FormFieldType.Email,
    FormFieldType.Password,
    FormFieldType.Number,
    FormFieldType.Date,
    FormFieldType.Textarea,
  ]

  const handleInputChange = (event: any) => {
    const { name, type } = event.target
    const value = type === "file" ? event.target.files[0] : event.target.value
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault()
    let hasError = false
    const newErrors = {}
    // Check for required fields
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
        hasError = true
      }
    })

    // Update errors state if there are errors
    if (hasError) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Send form data to backend or perform other actions here
    try {
      const result = await fetch(endpoint, {
        method: method.toString(),
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      })
      const { success } = await result.json()
      if (success) {
        return
      } else {
        return
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <form
      className="grid grid-cols-1 gap-2 space-y-4 rounded-xl bg-white p-4 font-raleway font-light"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl">{title}</h2>
      {fields.map((field, i) => (
        <>
          {field.type === FormFieldType.File && (
            <ImageField
              key={field.name}
              field={field}
              errors={errors}
              name={field.name}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {field.type === FormFieldType.Select && (
            <SelectField
              key={field.name}
              field={field}
              errors={errors}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {field.type === FormFieldType.Autocomplete && (
            <AutocompleteField
              key={field.name}
              name={field.name}
              label={field.label}
              table={field.table}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {commonFields.includes(field.type) && (
            <CommonField
              key={field.name}
              field={field}
              errors={errors}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
        </>
      ))}
      {isLoading ? (
        <button
          className="flex items-center justify-center rounded-xl bg-slate-600 p-2 font-bold text-white hover:bg-slate-800"
          disabled
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      ) : (
        <button
          className="rounded-lg bg-primary-500 p-2 font-raleway text-white hover:bg-primary-400 hover:text-primary-900 active:bg-primary-0"
          type="submit"
        >
          Submit
        </button>
      )}
    </form>
  )
}

export function ImageField({
  field,
  errors,
  name,
  formData,
  setFormData,
}: {
  field: FormField
  errors: any
  name: string
  formData: Object
  setFormData: Dispatch<SetStateAction<Object>>
}) {
  const [dragging, setDragging] = useState(false)
  const [image, setImage] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
    setFormData({ ...formData, [name]: file })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleBrowse = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
    setFormData({ ...formData, [name]: file })
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <label htmlFor={field.name}>{field.label}</label>
        {errors[field.name] && (
          <p className="text-red-500">{errors[field.name]}</p>
        )}
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative my-2 flex h-64 flex-col items-center justify-center rounded-xl bg-gray-200 p-4 shadow-inner"
      >
        {image ? (
          <Image
            alt="Product image"
            className="rounded-xl"
            src={image}
            layout="fill"
            objectFit="contain"
          />
        ) : dragging ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
            />
          </svg>
        ) : (
          <>
            <p>Drag & Drop ou clic</p>
            <input type="file" onChange={handleBrowse} />
          </>
        )}
      </div>
    </>
  )
}

export function SelectField({
  field,
  errors,
  formData,
  handleInputChange,
}: {
  field: FormField
  errors: any
  formData: Object
  handleInputChange: (event: any) => void
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <label className="w-1/4" htmlFor={field.name}>
        {field.label}
      </label>
      {errors[field.name] ? (
        <p className="w-1/4 text-red-500">{errors[field.name]}</p>
      ) : (
        <p></p>
      )}
      <select
        className="w-1/2 rounded-md border border-gray-300 p-2"
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleInputChange}
      >
        <option key="original" value="" disabled></option>
        {field.options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export const AutocompleteField = ({
  name,
  label,
  table,
  formData,
  setFormData,
}: {
  name: string
  label: string
  table: string
  formData: Object
  setFormData: Dispatch<SetStateAction<Object>>
}) => {
  const [suggestions, setSuggestions] = useState([])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    autoComplete(value)
  }

  async function autoComplete(value: string) {
    //function to fetch the suggestions starting if value length is greater than 3
    if (value.length > 3) {
      const res = await fetch(`/api/v1/${table}/${value}`, {
        method: "GET",
      }).then((res) => res.json())
      setSuggestions(res[`${table}`])
    }
  }

  useEffect(() => {
    //function to clear suggestions when clicked outside
    document.addEventListener("click", (event) => {
      setSuggestions([])
    })
  })

  return (
    <div className="relative">
      <div className="flex flex-col">
        <label htmlFor="shop">{label}</label>
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          name="shop"
          id="shop"
          placeholder={`${name} *`}
          value={formData[name]?.name}
        />
      </div>
      {suggestions?.length > 0 ? (
        <div className="z-50 w-full flex-col items-start rounded bg-white opacity-95 shadow-lg">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              onClick={() => setFormData({ ...formData, [name]: suggestion })}
              className="ml-2 flex w-full cursor-pointer flex-col items-start justify-center py-2 hover:bg-gray-100"
            >
              <div className="text-sm font-light">{suggestion.name}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const CommonField = ({
  field,
  errors,
  formData,
  handleInputChange,
}: {
  field: FormField
  errors: any
  formData: Object
  handleInputChange: (event: any) => void
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <label className="w-1/4" htmlFor={field.name}>
        {field.label}
      </label>
      {errors[field.name] ? (
        <p className="w-1/4 text-red-500">{errors[field.name]}</p>
      ) : (
        <p></p>
      )}
      <input
        className="w-1/2 rounded-md border-none p-2 shadow-inner"
        type={field.type}
        name={field.name}
        placeholder={field.required ? `${field.label} *` : field.label}
        value={formData[field.name] || ""}
        onChange={handleInputChange}
      />
    </div>
  )
}
