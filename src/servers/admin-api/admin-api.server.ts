import { init } from '@providers/app.provider';
import { config } from '@providers/config.provider';
import { AdminsController } from '@servers/admin-api/admins/admins.controller';
import { AdminController } from '@servers/admin-api/admins/admin.controller';

const { app, logger } = init('Admin API', [AdminsController, AdminController]);

app.listen(config.ADMIN_API_PORT, async () => {
  try {
  } catch (error) {
    console.error(error);
  }

  logger.success(`Admin API is listening on port: ${config.ADMIN_API_PORT}`, config);
});
