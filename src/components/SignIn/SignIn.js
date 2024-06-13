import { useState } from "react";

const SignIn = ({ onRouteChange, loadUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignin = () => {
        fetch('https://ai-face-detector-backend.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
           })}
        )
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                loadUser(user);
                onRouteChange('home');
            }
        });
    }

    return (
        <div className="flex-column center" style={{ height: '80vh'}}>
        <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={emailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={passwordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={onSubmitSignin} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" 
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p 
                        onClick={() => onRouteChange('register')} 
                        className="f6 link dim black db pointer">
                        Register
                    </p>
                    </div>
                </div>
            </main>
        </article>
        </div>
    );
}

export default SignIn;