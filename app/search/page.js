"use client"
import * as Form from '@radix-ui/react-form'
import { useState } from 'react';

export default function Search() {
	const [formFields, setFormFields] = useState({ input: "" })

	const changeHandler = (e) => {
		setFormFields(p => {
			let copy = { ...p }
			copy.input = e.target.value
			return copy
		})
	}

	const submitHandler = (e) => {
		e.preventDefault()
		alert(JSON.stringify(formFields, null, 2))
	}

	return (
		<>
			<Form.Root onSubmit={submitHandler}>
				<Form.Field>
					<Form.Label>Poo</Form.Label>
					<Form.Control asChild>
						<input type='text' placeholder='search' onChange={changeHandler} value={formFields.input}></input>
					</Form.Control>
				</Form.Field>
				<Form.Submit>poobutton</Form.Submit>
			</Form.Root>

			<pre>{JSON.stringify(formFields, null, 2)}</pre>
		</>
	)
}