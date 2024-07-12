import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Contacts from './pages/Contacts.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetContactsList } from './components/context/UserContactsContext.jsx';
const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<GetContactsList>
				<App />
			</GetContactsList>
		)
		// element: <DeleteModal/>
	},
	{
		path: '/pages/contacts',
		element: (
			<GetContactsList>
				<Contacts />
			</GetContactsList>
		)
	}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
