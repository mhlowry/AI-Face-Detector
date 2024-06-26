import { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateName = (event) => setName(event.target.value);
    const updateEmail = (event) => setEmail(event.target.value);
    const updatePassword = (event) => setPassword(event.target.value);

    const onSubmitRegister = () => {
        fetch('http://localhost:4000/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })})
        .then(response => response.json())
        .then(user => {
            if (user) {
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
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={updateName}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={updateEmail}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={updatePassword}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={onSubmitRegister} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register" 
                            />
                        </div>
                        <p 
                        onClick={() => onRouteChange('signin')} 
                        className="f6 link dim black db pointer">
                        Sign in
                        </p>
                    </div>
                </main>
            </article>
        </div>
    );
}

export default Register;