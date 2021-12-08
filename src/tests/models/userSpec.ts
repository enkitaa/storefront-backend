import { UserList } from '../../models/user';
import { User } from '../../models/user';

const user = new UserList();
let userId: string;

describe('User Model', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(user.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(user.delete).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(user.authenticate).toBeDefined();
  });
  it('should create new user and return it', async () => {
    const userInfo: User = {
      first_name: 'Ank',
      last_name: 'Sng',
      password: 'passd'
    };
    const result = await user.create(userInfo);
    expect(result.first_name).toEqual('Ank');
    expect(result.last_name).toEqual('Sng');
    if (result.id) {
      userId = result.id.toString();
    }
  });
  it('should return users list', async () => {
    const result = await user.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it('should return users by user id', async () => {
    const result = await user.show(userId);
    expect(result.first_name).toBe('Ank');
    expect(result.last_name).toBe('Sng');
  });
  it('should delete user by id', async () => {
    await user.delete(userId);
    const result = await user.show(userId);
    expect(result).toBeFalsy();
  });
});
