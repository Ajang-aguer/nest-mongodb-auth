import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { User } from 'src/users/schemas/users.schema';

export function mapUserToUpdateInput(
  user: User & { lastLogin: number },
): UpdateUserInput {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone || undefined,
    location: user.location || undefined,
    address: user.address || undefined,
    lastLogin: String(user.lastLogin),
    role: user.role,
  };
}
