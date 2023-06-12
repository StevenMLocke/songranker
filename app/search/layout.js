import { SearchForm } from "./components/SearchForm";

export default async function Search({ children }) {
	return (
		<>
			<SearchForm></SearchForm>
			{children}
		</>
	)
}