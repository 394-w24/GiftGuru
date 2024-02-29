import ProfilePage from "./profilePage";
import { BrowserRouter } from "react-router-dom";
import {render,screen} from "@testing-library/react"; 
describe('ProfilePage Testing', ()=> {
    it('When user arrives at profile page, if they arent signed in, they should get not signed-in message!', async () => {
        render(<BrowserRouter>
            <ProfilePage />
        </BrowserRouter>);
        screen.debug(); 
        const messageHeader = screen.getByText(/No user is currently signed in\./i);
        expect(messageHeader.tagName).toBe('H6');
        expect(messageHeader.textContent).toBe("No user is currently signed in."); 
    }); 
});  