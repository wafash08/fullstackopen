import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { NotificationContextProvider } from './contexts/notification-context';
import { UserContextProvider } from './contexts/user-context';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</UserContextProvider>
	</QueryClientProvider>,
);
