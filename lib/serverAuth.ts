import { NextApiRequest ,NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prismadb from "@/lib/prismadb";

// Checagem para ver se o usuário está logado
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

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