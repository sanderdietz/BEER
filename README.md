Networking:
The backend service listens on port 3000 and the frontend on port 5173.
Since they run in docker containers these ports are on the respective docker containers.
However, due to compose.yaml, the container ports are mapped to ports 3000 and 5173 on the host.

How does the frontend communicate with the backend?
In todo app example by Docker, there is a Traefik reverse proxy that manages this.
Result: both backend and frontend are not mapped to host ports, but are internally connected using Traefik and Traefik only exposes port 80 on the host.

Our solution: still map the ports to the host and let vite handle the networking.


TODO: 
- saldo's aanpassen na transactie
- pluizen en accounts table mergen. lidstatus vervangen met type: meeloper, lid, oud-lid, overig // dit is gedaan, nu nog express app refactor
- zod, dotenv, helmet, express-rate-limit
https://blog.logrocket.com/build-rest-api-node-express-mysql/
