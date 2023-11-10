import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";

const createNewUser = async () => {
    const user = await currentUser();

    if (user) {
        const match = await prisma.user.findUnique({
            where: {
                clerkId: user.id as string,
            },
        });

        if (!match) {
            await prisma.user.create({
                data: {
                    username: user.emailAddresses[0]?.emailAddress?.split('@')[0] || '',
                    clerkId: user.id,
                    email: user.emailAddresses?.[0]?.emailAddress || '',
                },
            });
        }
    }

    redirect('/tasks');
};

const NewUserPage = async () => {
    await createNewUser();

    return <div>Registering User...</div>;
};

export default NewUserPage;