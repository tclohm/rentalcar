import React, { useState, useContext } from "react";
import AuthForm from "../components/AuthForm";
import schema from "../validations/AuthSchema";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from 'formik';
import { useHistory, Link } from "react-router-dom";

const url = 'http://localhost:4000/login';

const Login = () => {

	const { accountLoggedIn } = useContext(AuthContext)

	const history = useHistory();

	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: schema,
		onSubmit: (values) => {
			const options = {
				method: 'post',
				credentials: 'include',
				headers: {
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: `email=${values.email}&password=${values.password}`
			}

			fetch(url, options)
			.then(response => {
				return response.json()
			})
			.then(data => {
				if (data.success) {
					accountLoggedIn()
					history.push("/")
				} else {
					setOpen(true)
				}
			})
			.catch(err => {
				console.log(err)
			})
		}
	})

	return (
		<>
			<AuthForm formik={formik} title="Sign in" open={open} handleClose={handleClose} />
			<p className="mx-8 mb-12 lg:ml-48">Create your account <Link className="text-blue-600" to="/signup">Sign up</Link>!</p>
		</>
	)
}

export default Login;