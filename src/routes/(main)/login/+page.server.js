export const actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        
        // TODO: Handle login logic
        return { success: true };
    },

    register: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');
        
         // TODO: Handle login logic
         return { success: true };
    },
    

};


