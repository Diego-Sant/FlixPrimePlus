import Input from '@/components/input';
import Image from 'next/image';
import axios from "axios";

import { signIn } from "next-auth/react";
import { ChangeEvent, useCallback, useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login  = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [variant, setVariant] = useState("login");
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'registrar' : 'login') // Caso o currentVariant for igual a login e for ativado, ele virará registrar, caso contrário, continuará como login
    }, []);

    const imageStyle = {
        width: 'auto',
        height: 'auto',
    };

    const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked)
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword); // Código para ao clicar no ícone, ele vai deixar de ser false para true e vice e versa
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    const resetPasswordVisibility = () => {
        setShowPassword(false);
    };

    const login = useCallback(async () => {
        try {

            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/perfis',
                expires: rememberMe ? 30 : 1, // Caso o checkbox for marcado, irá durar 30 dias logado, caso não for, será deslogado logo depois de sair da página
            });

            resetPasswordVisibility(); // Redefinir a visibilidade da senha
            
        } catch (error) {
            console.log(error)
        }
    }, [email, password, rememberMe])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/registrar', {
                email,
                name,
                password,
                confirmPassword
            })

            resetPasswordVisibility();

            login();
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, confirmPassword, login])
 
    return  (
        // position relative, full height/width(ocupar o espaço todo), buscar no repositório da imagem, sem repetições, fixado na tela e sem espaços em branco
        <div className="relative h-full w-full bg-[url('/images/movies.jpg')] bg-no-repeat bg-fixed bg-cover">
            {/* fundo preto com opacidade de 50% caso for 768px pra cima */}
            <div className="bg-black w-full h-full md:bg-opacity-50">
                {/* padding x(horizontal) e padding y(vertical) */}
                <nav className="px-12 py-5">
                    {/* const ImageStyle, height e priority não mudam absolutamente nada, mas tiveram que ser adicionados para sumirem os warnings */}
                    <Image src="/images/logo.png" alt="FlixPrime+" height={150} width={150} priority={true} style={imageStyle} />
                </nav>
                <div className="flex justify-center">

                    {/* Container preto com opacidade de 70%, padding de 16px, fica no centro da tela, 
                    em 1024px pra cima é 2/5 da tela, em 768px até o 1024px é 3/5 da tela e tem bordas arredondadas, 
                    caso a imagem não for large e medium ativa o w-full que faz o container encostar nas duas pontas da tela */}
                    <div className="bg-black bg-opacity-70 px-16 py-20 self-center mt-2 lg:w-2/5 md:w-3/5 lg:max-w-md rounded-md w-full">

                        <h2 className='text-white text-4xl mb-8 font-semibold'>
                            {/* caso esteja na tela de login, aparecerá "Entrar", caso esteja na tela de register, aparecerá "Criar uma conta" */}
                            {variant === 'login' ? "Entrar" : "Criar uma conta" }
                        </h2>

                        {/* flex-col faz com que os filhos dessa divisão sejam em colunas e o gap-4 adiciona um espaçamento de 4 pixels */}
                        <div className='flex flex-col gap-4'>
                            {variant === 'login' ? "" : <Input label="Usuário" onChange={(e) => setName(e.target.value)} id="name" value={name} /> }
                            <Input label="Email" onChange={(e) => setEmail(e.target.value)} id="email" type="email" value={email} />
                            <Input label="Senha" onChange={(e) => setPassword(e.target.value)} id="password" type={showPassword ? "type" : "password"} value={password} endSlot={
                                showPassword ? (
                                    <AiOutlineEye className='text-neutral-500 cursor-pointer' onClick={togglePasswordVisibility}/>
                                ) : (
                                    <AiOutlineEyeInvisible className='text-neutral-500 cursor-pointer' onClick={togglePasswordVisibility}/>
                                )
                            } />
                            {variant === 'login' ? "" : <Input label="Confirme a senha" onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type={showConfirmPassword ? "type" : "password"} value={confirmPassword} endSlot={
                                showConfirmPassword ? (
                                    <AiOutlineEye className='text-neutral-500 cursor-pointer' onClick={toggleConfirmPasswordVisibility}/>
                                ) : (
                                    <AiOutlineEyeInvisible className='text-neutral-500 cursor-pointer' onClick={toggleConfirmPasswordVisibility}/>
                                )
                            } /> }
                        </div>

                        <button onClick={variant === 'login' ? login : register} className='bg-[#209cee] py-3 text-white rounded-md w-full mt-10 hover:bg-blue-500 transition'>
                            {variant === 'login' ? "Entrar" : "Criar uma conta" }
                        </button>

                        {/* caso esteja na tela de login, aparecerá o checkbox e o precisa de ajuda, caso seja no register, não terá nada */}
                        {variant === 'login' ? 
                        <div className='flex items-center justify-between mt-2 w-full'> {/* justify-between para deixar o checkbox com o lembre-se de mim de um lado e o precisa de ajuda no outro */}
                            <div className='flex items-center'>
                                {/* accent-neutral-400 para deixar a cor do checkbox mais clara e deixar o quadrado 4x4 */}
                                <input type="checkbox" className=' accent-neutral-400 mr-1 h-4 w-4' onChange={handleRememberMeChange} />
                                <p className='text-neutral-300 text-sm'>Lembre-se de mim</p>
                            </div>
                            <p className='text-neutral-300 hover:underline cursor-pointer text-sm'>Precisa de ajuda?</p>
                        </div> : "" }

                        <div className='flex flex-row items-center gap-4 mt-10 justify-center'>
                             <div onClick={() => signIn('google', { callbackUrl: '/perfis' })} className='w-32 h-10 bg-white rounded-md flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                                 <FcGoogle size={30} />
                             </div>
                         </div>

                        {variant === 'login' ? 
                            <p className='text-neutral-500 mt-12'>Novo por aqui?<span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>Assine agora</span></p>
                            : 
                            <p className='text-neutral-500 mt-12'>Já tem uma conta?<span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>Entrar</span></p> 
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;