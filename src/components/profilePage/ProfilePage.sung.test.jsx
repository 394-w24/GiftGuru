import ProfilePage from "./profilePage";
import { BrowserRouter } from "react-router-dom";
import {render,screen} from "@testing-library/react"; 
import { useAuthState } from "../../../utilities/firebaseUtils";
//mock implementation of useAuthState! 
vi.mock("../../../utilities/firebaseUtils"); 

describe('ProfilePage Testing', ()=> {
    it('When user arrives at profile page, if they arent signed in, they should get not signed-in message!', async () => {
        const firebaseUtils = await import("../../../utilities/firebaseUtils");
        firebaseUtils.useAuthState = vi.fn().mockReturnValue([]); 
        render(<BrowserRouter>
            <ProfilePage />
        </BrowserRouter>);
        const messageHeader = screen.getByText(/No user is currently signed in\./i);
        expect(messageHeader.tagName).toBe('H6');
        expect(messageHeader.textContent).toBe("No user is currently signed in."); 
    }); 
    it('If a signed-in user arrives at profile page, they should see two button options: one for sign-in and another for deletion of account', async () => {
        const sampleUser = {
            displayName: "Jane Doe",
            email: "janedoe@gmail.com"
        };
        const firebaseUtils = await import("../../../utilities/firebaseUtils");
        //mock useAuthState hook to return this sample logged-in user(Jane Doe)! 
        firebaseUtils.useAuthState = vi.fn().mockReturnValue([sampleUser, false]); 
        render(<BrowserRouter><ProfilePage /></BrowserRouter>);
        const signOutBtn = screen.getByText(/SIGN OUT/i);
        expect(signOutBtn.tagName).toBe('BUTTON');
        expect(signOutBtn.textContent).toBe('SIGN OUT');
        const deleteBtn = screen.getByText(/DELETE ACCOUNT/i);
        expect(deleteBtn.tagName).toBe('BUTTON');
        expect(deleteBtn.textContent).toBe('DELETE ACCOUNT'); 

        //check for user credentials also appearing! 
        const nameHeader = screen.getByText(/Jane Doe/i);
        const emailHeader = screen.getByText(/Email: janedoe@gmail.com/);
        expect(nameHeader.tagName).toBe('H6');
        expect(nameHeader.textContent).toBe(sampleUser.displayName);
        expect(emailHeader.tagName).toBe('H6');
        expect(emailHeader.textContent).toBe(`Email: ${sampleUser.email}`); 
    }); 
});  