"use client"
import React, { useEffect, useState } from 'react'
import { CallBackMailIcon, CallBackPhoneIcon, ClousIcon, WpIcon } from "../../svg"
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectContacts } from '../../store/slices/contacts/contactsSlice';

function CallbackModal({ succsesClick }) {
  const [modalType, setModalType] = useState("contacts")
  const { contactsData } = useSelector(selectContacts)
  const validationSchema = yup.object().shape({
    name: yup.string()
      .typeError('Напишите свое имя')
      .min(3, 'Слишком короткое имя')
      .required('Обязательное поле'),
    phone: yup.string()
      .min(3, 'Слишком короткий номер')
      .matches(/[0-9]/, 'Только цифры')
      .required('Обязательное поле'),
    email: yup.string()
      .typeError('Пример: example@mail.ru')
      .email('Недопустимый формат')
      .required('Обязательное поле'),
  });
  return (
    <div className='callback-modal'>
      <div className='callback-modal__container'>
        <div className='callback-modal__title'>
          <p>Связаться с менеджером</p>
          <button onClick={() => succsesClick(null)}><ClousIcon /></button>
        </div>
        <div className='callback-modal__set'>
          <button className={modalType === "contacts" ? "active" : ""} onClick={() => setModalType("contacts")}>Контакты</button>
          <button className={modalType === "callback" ? "active" : ""} onClick={() => setModalType("callback")}>Обратный звонок</button>
        </div>
        {
          modalType === "contacts" ? (
            <div className='callback-modal__contacts'>
              <div className='callback-modal__contacts-item'>
                <CallBackPhoneIcon />
                <div className='links'>
                  <a href={`tel:${contactsData?.phone_1}`}>{contactsData?.phone_1}</a>
                  <a href={`tel:${contactsData?.phone_2}`}>{contactsData?.phone_2}</a>
                  <a href={`tel:${contactsData?.phone_3}`}>{contactsData?.phone_3}</a>
                </div>
              </div>
              <div className='callback-modal__contacts-item'>
                <WpIcon />
                <div className='links'>
                  <a href={`https://api.whatsapp.com/send?phone=${contactsData?.whats_up}`}>{contactsData?.whats_up}</a>
                </div>
              </div>
              <div className='callback-modal__contacts-item'>
                <CallBackMailIcon />
                <div className='links'>
                  <a href={`mailto:${contactsData?.email_1}`} >{contactsData?.email_1}</a>
                  <a href={`mailto:${contactsData?.email_2}`} >{contactsData?.email_2}</a>
                </div>
              </div>
            </div>
          ) : (
            <div className='callback-modal__form'>
              <p>Оператор перезвонит в течении нескольких минут.</p>
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  email: ""
                }}
                onSubmit={async (values, { resetForm }) => {
                  await axios.post("https://back.brend-instrument.ru/api/call-back/add", {
                    email: values.email,
                    phone: values.phone,
                  }).then(res => {
                    if (res.data.status === 200) {
                      succsesClick("succes")
                    }
                  })

                  resetForm();
                }}
                validateOnBlur
                validationSchema={validationSchema}
              >{({ values, errors, touched, handleChange, handleBlur, isValid, dirty, handleSubmit }) => (
                <Form autoComplete="off" className='registration__form' onSubmit={handleSubmit}>
                  <label className='input-text'>Имя *
                    <Field type="text" className="input" name="name" autoComplete="off" style={{ borderColor: errors.name && touched.name ? 'red' : 'inherit' }} onChange={handleChange} onBlur={handleBlur} />
                  </label>
                  <label className='input-text'>введите эл. адрес *
                    <Field type="email" className="input" name="email" autoComplete="off" inputProps={{ autoCapitalize: "off" }} style={{ borderColor: errors.email && touched.email ? 'red' : 'inherit' }}
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
                      style={{ borderColor: errors.phone && touched.phone ? 'red' : 'inherit' }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                  <label className="input-btn"><input type="submit" defaultValue="Отправить заявку" className="input" /></label>
                </Form>
              )}
              </Formik>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CallbackModal