import React, { ReactNode } from "react"

interface InputProps {
    id: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // React.ChangeEvent é especificamente feito para funções onChange
    value: string,
    label: string,
    type?: string // ?: significa ser opicional
    endSlot?: ReactNode; // Ícone de visibilidade da senha
}

// React.FC<> é usado para definir um componente funcional(Functional Component), isso permite especificar os valores de id, onChange, value, label e type dentro do const Input
const Input: React.FC<InputProps>  = ({id, onChange, value, label, type, endSlot}) => {
    
    return (
        <div className="relative">

            {/* rounded-md: bordas arredondadas, w-full: faz com que o elemento ocupe toda a largura, text-md: tamanho da fonte
            bg-neutral-700: defino a cor como neutra com intensidade de 700, appearence-none: remove estilos padrão
            focus:outline e focus:ring: remove estilos de foco(borda e o anel), peer: usada em conjunto com as classes do label para fazer a animação,
            já o placeholder vazio foi para não atrapalhar o {label} dentro do label */}
            <input onChange={onChange} value={value} type={type} id={id} className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 
            appearence-none focus:outline-none focus:ring-0 peer" placeholder=" " />

            {/* Caso o endSlot exista, irá ativar a função,
            absolute define posição absoluta em relação ao container pai, inset-y-0 foi deixar no topo do input, 
            right-0 para enconstar na direita, flex items-center foi para centralizar em relação ao input, 
            pr-3 foi não deixar tão colado assim com a direita */}
            {endSlot && (
                <div className="absolute inset-y-0 text-2xl right-0 flex items-center pr-3">
                    {endSlot}
                </div>
            )}

            {/* duration-150: define a transição da animação para 1.5 segundos, transform: permite aplicar transformações no elemento,
            -translate-y-3: move o elemento pra cima em 12px, scale-75: redimensiona o elemento para 75% do seu tamanho original,
            top-4: define a posição 16px para cima, z-10: z-index de 10, origin-[0]: define o ponto de origem das transformações no canto superior esquerdo,
            peers: no "shown" significa que é o estado que eles começam, já no focus é quando são clicados, ou seja, no shown o scale é 100, mas quando é clicado vira 75*/}
            <label  htmlFor={id} className="absolute text-md text-zinc-400 duration-150 
            transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
            {label}
            </label>

        </div>
    )
}

export default Input;