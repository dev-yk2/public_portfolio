import { ButtonBasic } from '@/features/bookshelf/components/ButtonBasic'
import React from 'react'

type SignInFormContainerProps = {
  className?: string
  containerTitle: string
  email: string
  password: string
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleEmailInputChange: React.ChangeEventHandler<HTMLInputElement>
  handlePasswordInputChange: React.ChangeEventHandler<HTMLInputElement>
  buttonText: string
}

export const SignInFormContainer: React.FC<SignInFormContainerProps> = ({
  className,
  containerTitle,
  email,
  password,
  handleSubmit,
  handleEmailInputChange,
  handlePasswordInputChange,
  buttonText,
}) => {
  return (
    <section className={`flex justify-center items-center ${className}`}>
      <form className="p-4 border" onSubmit={handleSubmit}>
        <h2 className="text-center">{containerTitle}</h2>
        <dl className="mt-4">
          <dt className="text-sm">Email</dt>
          <dd className="mt-1">
            <input className="bg-zinc-200" type="email" value={email} onChange={handleEmailInputChange} />
          </dd>
        </dl>
        <dl className="mt-3">
          <dt className="text-sm">パスワード</dt>
          <dd>
            <input className="bg-zinc-200" type="password" value={password} onChange={handlePasswordInputChange} />
          </dd>
        </dl>
        <div className="flex justify-center mt-4">
          <ButtonBasic>{buttonText}</ButtonBasic>
        </div>
      </form>
    </section>
  )
}
