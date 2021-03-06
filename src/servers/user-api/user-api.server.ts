import { init } from '@providers/app.provider';
import { config } from '@providers/config.provider';
import { UsersController } from '@servers/user-api/users/users.controller';

const { app, logger } = init(
  'User API',
  [UsersController],
);

app.listen(config.USER_API_PORT, async () => {
  try {
  } catch (error) {
    console.error(error);
  }

  logger.success(`User API is listening on port: ${config.USER_API_PORT}`, config);
});
