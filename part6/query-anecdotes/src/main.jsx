import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { NotificationContextProvider } from './contexts/notification-context';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<NotificationContextProvider>
			<App />
		</NotificationContextProvider>
	</QueryClientProvider>
);
