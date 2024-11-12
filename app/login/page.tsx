import Image from "next/image";

const LoginPage = () => {
    return ( <div className="grid grid-cols-2 h-full">
        <div className="flex flex-col h-full justify-center p-8 ">
        <Image src="/logo.svg" width={173} height={39} alt="Next Financy"/>
           <h1>Bem-vindo</h1>
        <p>A Next Financy é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações e oferecer insights personalizados, facilitando o controle do seu orçamento</p>
        </div>

       
        <div className="relative h-full w-full">
        <Image src="/login.png" alt="Faça login" fill className="object-cover"/>
        </div>
       
    </div> );
}
 
export default LoginPage;