import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

// Checagem para ver se o usuário está logado
const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });

    if (!session?.user?.email) {
        throw new Error('Você não está logado!')
    }

    // Conferir se o usuário atual corresponde com o email
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error('Você não está logado!')
    }

    return { currentUser };
};

export default serverAuth;