"use client";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";

export function SearchForm() {
	const [formFields, setFormFields] = useState("");

	const changeHandler = (e) => {
		setFormFields(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		alert(JSON.stringify(formFields, null, 2));
	};

	return (
		<Form.Root action={`/search/artist/${formFields}`}>
			<Form.Field className='border-2 input-group'>
				<Form.Submit className='btn btn-neutral rounded-md'>Search</Form.Submit>
				<Form.Control asChild>
					<input
						className='input'
						type='text'
						placeholder='search for artist..'
						onChange={changeHandler}
						value={formFields.input}
					></input>
				</Form.Control>
			</Form.Field>
			{/* <pre>{JSON.stringify(formFields, null, 2)}</pre> */}
		</Form.Root>
	);
}
