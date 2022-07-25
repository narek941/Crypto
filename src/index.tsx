import moment from 'moment';
import ReactDOM from 'react-dom/client';

import App from './App';

moment.updateLocale(moment.locale(), { invalidDate: '-' });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
