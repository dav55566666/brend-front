import React, { useEffect, useState } from 'react'
import MyRoomMenu from '../MyRoomMenu/MyRoomMenu'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import Loader from '../Loader/Loader'
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PenIcon } from '../../svg'
import { fetchUser } from '../../store/slices/users/usersApi'
import SuccsesModal from '../SuccsesModal/SuccsesModal'

function MyRoom() {
    const { usersData, loginData } = useSelector(selectUsers)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const validationSchema = yup.object().shape({
        name: yup.string()
            .typeError('Напишите свое имя')
            .min(3, 'Слишком короткое имя')
            .required('Обязательное поле'),
        lastName: yup.string()
            .typeError('Напишите свое отчество')
            .min(3, 'Слишком короткое отчество')
            .required('Обязательное поле'),
        email: yup.string()
            .typeError('Пример: example@mail.ru')
            .email('Недопустимый формат')
            .required('Обязательное поле'),
        phone: yup.string()
            .min(3, 'Слишком короткий номер')
            .matches(/[0-9]/, 'Только цифры')
            .required('Обязательное поле'),
        fatherName: yup.string(),
        address_1: yup.string(),
        // address_2: yup.string(),
        city: yup.string(),
        // post: yup.string(),
        // country: yup.string(),
        // region: yup.string(),
        created_at: yup.string(),
        // company: yup.string(),
    });
    const router = useRouter()
    // useEffect(() => {
    //     return () => {
    //         router.push('/')
    //     };
    // }, [])

    return (
        <>
            {usersData.id ?
                <section className="myroom">
                    <div className="myroom__container _container">
                        <h1>Личный Кабинет</h1>
                        <div className="myroom__flex">
                            <MyRoomMenu />
                            <div className="myroom__right">
                                <h2>Ваша учетная запись</h2>
                                <Formik
                                    initialValues={
                                        usersData.address?.length ? {
                                            name: usersData.address[0].name,
                                            lastName: usersData.address[0].lastName,
                                            fatherName: usersData.address[0].fatherName ? usersData.address[0].fatherName : "",
                                            phone: usersData.address[0].phone,
                                            email: usersData.address[0].email,
                                            created_at: usersData.address[0].created_at,
                                            company: usersData.address[0].company ? usersData.address[0].company : "",
                                            address_1: usersData.address[0].address_1 ? usersData.address[0].address_1 : "",
                                            address_2: usersData.address[0].address_2 ? usersData.address[0].address_2 : "",
                                            city: usersData.address[0].city ? usersData.address[0].city : "",
                                            post: usersData.address[0].post ? usersData.address[0].post : "",
                                            country: usersData.address[0].country ? usersData.address[0].country : "",
                                            region: usersData.address[0].region ? usersData.address[0].region : "",
                                        } : {
                                            name: usersData.name,
                                            lastName: usersData.lastName,
                                            fatherName: usersData.fatherName ? usersData.fatherName : "",
                                            phone: usersData.phone,
                                            email: usersData.email,
                                            created_at: usersData.created_at,
                                            company: usersData.company ? usersData.company : "",
                                            address_1: usersData.address_1 ? usersData.address_1 : "",
                                            address_2: usersData.address_2 ? usersData.address_2 : "",
                                            city: usersData.city ? usersData.city : "",
                                            post: usersData.post ? usersData.post : "",
                                            country: usersData.country ? usersData.country : "",
                                            region: usersData.region ? usersData.region : "",
                                        }
                                    }
                                    onSubmit={async (values, { resetForm }) => {
                                        try {
                                            await axios.post(
                                                `https://back.brend-instrument.ru/api/auth/update/${usersData.id}`,
                                                values,
                                                {
                                                    headers: {
                                                        Authorization: "Bearer " + loginData.access_token,
                                                    },
                                                }
                                            )
                                            dispatch(fetchUser({ userToken: loginData.access_token }))
                                            setSuccess(true)
                                            resetForm();
                                        } catch (error) {
                                            
                                        }
                                    }}
                                    validateOnBlur
                                    validationSchema={validationSchema}
                                >{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <Form autoComplete="off" onSubmit={handleSubmit}>
                                        <div className="myroom__grid">
                                            <label className="input-text">Имя *<Field type="text" className="input" placeholder="Иван" name="name" defaultValue={usersData.name} autoComplete="off" style={{ borderColor: errors.name && touched.name ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Фамилия *<Field type="text" className="input" placeholder="Иванов" name="lastName" defaultValue={usersData.lastName} autoComplete="off" style={{ borderColor: errors.lastName && touched.lastName ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Отчество<Field type="text" className="input" placeholder="Иванович" autoComplete="off" name="fatherName" style={{ borderColor: errors.fatherName && touched.fatherName ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Эл. адрес *<Field type="text" className="input" placeholder="ivan.ivanovich@gmail.com" defaultValue={usersData.email} name="email" autoComplete="off" style={{ borderColor: errors.email && touched.email ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            <label className="input-text">Телефон *
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
                                            {/* <label className="input-text">Компания<Field type="text" className="input" placeholder="TESTWEB" defaultValue={usersData.company && usersData.company} name="company" autoComplete="off" style={{ borderColor: errors.company && touched.company ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            <label className="input-text">Адрес *<Field type="text" className="input" placeholder="Адрес" defaultValue={usersData.address_1 && usersData.address_1} name="address_1" autoComplete="off" style={{ borderColor: errors.address_1 && touched.address_1 ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            {/* <label className="input-text">Адрес 2<Field type="text" className="input" placeholder="Адрес 2" defaultValue={usersData.address_2 && usersData.address_2} name="address_2" autoComplete="off" style={{ borderColor: errors.address_2 && touched.address_2 ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            <label className="input-text">Город *<Field type="text" className="input" placeholder="Город" defaultValue={usersData.city && usersData.city} name="city" autoComplete="off" style={{ borderColor: errors.city && touched.city ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                            {/* <label className="input-text">Почтовый индекс *<Field type="text" className="input" placeholder={125009} defaultValue={usersData.post && usersData.post} name="post" autoComplete="off" style={{ borderColor: errors.post && touched.post ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            {/* <label className="input-text">Страна *<Field type="text" className="input" placeholder="Российская Федерация" defaultValue={usersData.country && usersData.country} name="country" autoComplete="off" style={{ borderColor: errors.country && touched.country ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            {/* <label className="input-text">Регион / Область *<Field type="text" className="input" placeholder="Алтайский край" defaultValue={usersData.region && usersData.region} name="region" autoComplete="off" style={{ borderColor: errors.region && touched.region ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label> */}
                                            <label className="input-text">Дата регистрации<Field type="text" className="input" placeholder="14-07-2020 11:30" defaultValue={usersData.created_at && usersData.created_at} name="created_at" autoComplete="off" style={{ borderColor: errors.created_at && touched.created_at ? 'red' : '#EDEDED' }} onChange={handleChange} onBlur={handleBlur} /></label>
                                        </div>
                                        <label className="input-btn">
                                            <button className="input" type='submit'>
                                                <PenIcon />
                                                Изменить мою информацию
                                            </button>
                                        </label>
                                    </Form>
                                )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section> : <Loader />
            }
            {
                success && <SuccsesModal title={"Ваши данный успешно изменены!"} succsesClick={setSuccess}  />
            }
        </>

    )
}

export default MyRoom
