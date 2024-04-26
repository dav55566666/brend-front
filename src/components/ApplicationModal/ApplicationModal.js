"use client"
import React from 'react'
import { ClousIcon } from "../../svg"
import { Formik, Field, Form } from 'formik';
import Image from 'next/image';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import axios from 'axios';

function ApplicationModal({setAppModal}) {
  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Обязательное поле'),
    lastName: yup.string()
      .required('Обязательное поле'),
    email: yup.string()
      .typeError('Пример: example@mail.ru')
      .email('Недопустимый формат')
      .required('Обязательное поле'),
    phone: yup.string()
      .min(3, 'Слишком короткий номер')
      .matches(/[0-9]/, 'Только цифры')
      .required('Обязательное поле'),
    company: yup.string()
      .required('Обязательное поле'),
    ihh: yup.string()
      .required('Обязательное поле'),
    kpp: yup.string()
      .required('Обязательное поле'),
    bik: yup.string()
      .required('Обязательное поле'),
    pc: yup.string()
      .required('Обязательное поле'),
    address: yup.string()
      .required('Обязательное поле'),
    notes: yup.string()
  });
  return (
    <div className='application-modal'>
      <div className='application-modal__container'>
        <div className='application-modal__title'>
          <p>Заявка на счет</p>
          <button onClick={() => setAppModal(false)}>
            <ClousIcon />
          </button>
        </div>
        <div className='application-modal__form'>
          <Formik
            initialValues={{
              name: "",
              lastName: "",
              company: "",
              phone: "",
              email: "",
              ihh: "",
              kpp: "",
              bik: "",
              pc: "",
              address: "",
              notes: ""
            }}
            onSubmit={async (values, { resetForm }) => {

              const {data: applicationData} = await axios.post("https://back.brend-instrument.ru/api/request-price", {
                name: values.name,
                lastName: values.lastName,
                company: values.company,
                phone: values.phone,
                email: values.email,
                ihh: values.ihh,
                kpp: values.kpp,
                bik: values.bik,
                pc: values.pc,
                address: values.address,
                notes: values.notes
              })
              if(applicationData.status === 200) {
                setAppModal("succes")
              }
              resetForm();
            }}
            validateOnBlur
            validationSchema={validationSchema}
          >{({ values, errors, touched, handleChange, handleBlur, isValid, dirty, handleSubmit }) => (
            <Form autoComplete="off" className='registration__form' onSubmit={handleSubmit}>
              <label className='input-text'>Имя *
                <Field type="text" className="input" name="name" autoComplete="off" style={{ borderColor: errors.name && touched.name ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <label className='input-text'>Фамилия *
                <Field type="text" className="input" name="lastName" autoComplete="off" style={{ borderColor: errors.lastName && touched.lastName ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <label className='input-text'>эл. адрес *
                <Field type="email" className="input" name="email" autoComplete="off" style={{ borderColor: errors.email && touched.email ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <label className='input-text'>Телефон *
                <InputMask
                  mask="+7 (999) 999-99-99"
                  maskChar={null}
                  type="text"
                  name="phone"
                  className="input"
                  autoComplete="off"
                  style={{ borderColor: errors.phone && touched.phone ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <label className='input-text'>Компания *
                <Field type="text" className="input" name="company" autoComplete="off" style={{ borderColor: errors.company && touched.company ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <h4>Реквизиты компании (ИНН, КПП, БИК, Р/С, Юр адрес *)</h4>
              <div className='flex'>
                <label className='input-text'>ИНН *
                  <Field type="text" className="input" name="ihh" autoComplete="off" style={{ borderColor: errors.ihh && touched.ihh ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} />
                </label>
                <label className='input-text'>КПП *
                  <Field type="text" className="input" name="kpp" autoComplete="off" style={{ borderColor: errors.kpp && touched.kpp ? 'red' : '#EDEDED' }}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                </label>
              </div>
              <div className='flex'>
                <label className='input-text'>БИК *
                  <Field type="text" className="input" name="bik" autoComplete="off" style={{ borderColor: errors.bik && touched.bik ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} />
                </label>
                <label className='input-text'>Р/С *
                  <Field type="text" className="input" name="pc" autoComplete="off" style={{ borderColor: errors.pc && touched.pc ? 'red' : '#EDEDED' }}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                </label>
              </div>
              <label className='input-text'>Юр. адрес *
                <Field type="text" className="input" name="address" autoComplete="off" style={{ borderColor: errors.address && touched.address ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <label className='input-text'>примечания
                <Field as="textarea" className="input textarea" name="notes" autoComplete="off" inputProps={{ autoCapitalize: "off" }} style={{ borderColor: errors.notes && touched.notes ? 'red' : '#EDEDED' }}
                  onChange={handleChange}
                  onBlur={handleBlur} />
              </label>
              <label className="input-btn"><input type="submit" value="Отправить" className="input" /></label>
            </Form>
          )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ApplicationModal