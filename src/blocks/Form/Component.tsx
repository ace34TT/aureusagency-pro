'use client'
import type { Form as FormType, FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import type { Global } from '@/payload-types'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
    globalData?: Global
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    globalData,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Une erreur est survenue.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const { contact, socialLinks } = globalData || {}

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-50/70 blur-[110px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-50/70 blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Left Column: Form */}
          <div>
            {enableIntro && introContent && !hasSubmitted && (
              <div className="mb-8">
                <RichText data={introContent} enableGutter={false} />
              </div>
            )}

            <div className="rounded-4xl border border-[#0F172A]/10 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] backdrop-blur md:p-8">
              <h2 className="mb-6 text-2xl font-(--font-marcellus) text-[#0F172A]">
                Parlez-nous de votre projet
              </h2>
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <RichText data={confirmationMessage} />
                )}
                {isLoading && !hasSubmitted && <p>Chargement, veuillez patienter...</p>}
                {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6 space-y-6">
                      {formFromProps &&
                        formFromProps.fields &&
                        formFromProps.fields?.map((field, index) => {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const Field: React.FC<any> =
                            fields?.[field.blockType as keyof typeof fields]
                          if (Field) {
                            return (
                              <div className="" key={index}>
                                <Field
                                  form={formFromProps}
                                  {...field}
                                  {...formMethods}
                                  control={control}
                                  errors={errors}
                                  register={register}
                                />
                              </div>
                            )
                          }
                          return null
                        })}
                    </div>

                    <Button form={formID} type="submit" variant="default" className="w-full">
                      {submitButtonLabel}
                    </Button>
                  </form>
                )}
              </FormProvider>
            </div>
          </div>

          {/* Right Column: Company Info */}
          <div className="space-y-8">
            <div className="rounded-[28px] border border-[#0F172A]/10 bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[#0F172A]/50">
                Contact
              </p>
              <h3 className="mt-3 text-2xl font-(--font-marcellus) text-[#0F172A]">
                Contactez-nous
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Nous serions ravis de discuter de votre projet. N&apos;hésitez pas à nous contacter
                pour toute question ou demande de devis.
              </p>

              {contact && (
                <div className="mt-8 space-y-6">
                  {contact.email && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">Email</h4>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-sm text-slate-600 hover:text-primary transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">Téléphone</h4>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-sm text-slate-600 hover:text-primary transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.address && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">Adresse</h4>
                        <p className="text-sm text-slate-600 whitespace-pre-line">
                          {contact.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {socialLinks && socialLinks.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Suivez-nous</h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, i) => {
                      const { platform, url } = link
                      let Icon = null
                      if (platform === 'facebook') Icon = FaFacebook
                      if (platform === 'instagram') Icon = FaInstagram
                      if (platform === 'linkedin') Icon = FaLinkedin
                      if (platform === 'whatsapp') Icon = FaWhatsapp

                      if (!Icon) return null

                      return (
                        <Link
                          key={i}
                          href={url}
                          target="_blank"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F172A]/10 bg-white text-slate-600 transition-all hover:border-primary hover:bg-primary hover:text-white"
                        >
                          <Icon />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
